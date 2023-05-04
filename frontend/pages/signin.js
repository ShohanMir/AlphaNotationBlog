import Link from "next/link";
import Layout from "../component/Layout";
import Signincomponent from "../component/authentication/Signin.component";

function SignIn() {
  return (
    <div>
      <Layout>
        <h2>Sign In page</h2>

        <Signincomponent />
      </Layout>
    </div>
  );
}

export default SignIn;
