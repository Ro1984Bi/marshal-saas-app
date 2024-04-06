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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import prisma from "@/app/db/database";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import LoadingButton from "@/app/components/Loading";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      colorSchema: true,
    },
  });
  return data;
}

export default async function SettingsPage() {
  noStore()
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);

  async function postData(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const colorSchema = formData.get("color") as string;

    await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        name: name ?? undefined,
        colorSchema: colorSchema ?? undefined,
      },
    });
    revalidatePath("/", "layout");
  }

  return (
    <div className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Settings</h1>
          <p className="text-lg text-muted-foreground">Profile settings</p>
        </div>
      </div>
      <Card>
        <form action={postData}>
          <CardHeader>
            <CardTitle>General Data</CardTitle>
            <CardDescription>
              Please provide general info about yourself. Don't forget to save
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label>Name</Label>
                <Input
                  name="name"
                  type="text"
                  id="name"
                  placeholder="Name"
                  defaultValue={data?.name ?? undefined}
                />
              </div>
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Email"
                  disabled
                  defaultValue={data?.email as string}
                />
              </div>
              <div className="space-y-1">
                <Label>Color Scheme</Label>
                <Select name="color" defaultValue={data?.colorSchema}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Colors</SelectLabel>
                      <SelectItem value="theme-green">Green</SelectItem>
                      <SelectItem value="theme-blue">Blue</SelectItem>
                      <SelectItem value="theme-violet">Violet</SelectItem>
                      <SelectItem value="theme-yellow">Yellow</SelectItem>
                      <SelectItem value="theme-orange">Orange</SelectItem>
                      <SelectItem value="theme-red">Red</SelectItem>
                      <SelectItem value="theme-rose">Rose</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <LoadingButton />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
