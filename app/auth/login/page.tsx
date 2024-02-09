import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./LoginForm";

type Props = {
  searchParams: {
    register?: string;
  };
};

const LoginPage = ({ searchParams }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {searchParams.register
            ? "Log In to register for events"
            : "Welcome Back!"}
        </CardTitle>
        <CardDescription>Login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
};

export default LoginPage;
