import LoadingButton from "@/app/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import prisma from "@/app/db/database";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";

async function getData({ userId, noteId }: { userId: string; noteId: string }) {
  noStore()
  const data = await prisma.note.findUnique({
    where: {
      id: noteId,
      userId: userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
    },
  });
  return data;
}

export default async function DynamicPage({
  params,
}: {
  params: { id: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({ userId: user?.id as string, noteId: params.id });

  async function postData(formData: FormData) {
    "use server";

    if (!user) throw new Error("Not allowed");

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    await prisma.note.update({
      where: {
        id: data?.id,
        userId: user.id,
      },
      data: {
        title: title,
        description: description,
      },
    });
    revalidatePath('/dashboard')

    return redirect("/dashboard");
  }
  return (
    <Card>
      <form action={postData}>
        <CardHeader>
          <CardTitle>Edit Note</CardTitle>
          <CardDescription>Right here you can edit your notes</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-5">
          <div className="gap-y-2 flex flex-col">
            <Label>Title</Label>
            <Input
              required
              type="text"
              name="title"
              placeholder="Title for your note"
              defaultValue={data?.title}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              placeholder="Describe your note as you want"
              required
              defaultValue={data?.description}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button asChild variant="destructive">
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <LoadingButton />
        </CardFooter>
      </form>
    </Card>
  );
}
