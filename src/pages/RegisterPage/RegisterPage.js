import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { RegisterLoginFormContainerLayout } from "../../layouts/RegisterLoginFormLayout/RegisterLoginFormContainerLayout";
import { RegisterLoginPageLayout } from "../../layouts/RegisterLoginPageLayout/RegisterLoginPageLayout";

export const RegisterPage = () => {
    return (
        <RegisterLoginPageLayout>
            <RegisterLoginFormContainerLayout>
                <RegisterForm/>
            </RegisterLoginFormContainerLayout>
        </RegisterLoginPageLayout>
    )
};