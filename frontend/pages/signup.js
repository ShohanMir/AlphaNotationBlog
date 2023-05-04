import Link from "next/link";
import Layout from "../component/Layout";
import SignupComponent from "../component/authentication/SignupComponent";

function Signup() {
  return (
    <div>
      <Layout>
        <h2>Signup page</h2>
        <SignupComponent />
      </Layout>
    </div>
  );
}

export default Signup;
