import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import ValidationError from "../errors/ValidationError";

export default observer(function RegisterForm()
{
    const { userStore } = useStore();
    return (
        <Formik 
            initialValues={{displayName: "", username: "", email: "", password: "", error: null}}
            onSubmit={(values, { setErrors }) => 
                userStore.register(values)
                .catch(error => setErrors({ error }))}
                validationSchema={Yup.object({
                    displayName: Yup.string().required(),
                    username: Yup.string().required(),
                    email: Yup.string().required(),
                    password: Yup.string().required(),
                })}>

                {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                    <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
                        <Header as="h2" content="Sign up to Reactivities" color="teal" textAlign="center"></Header>
                        <TextInput placeholder="Display name" name="displayName"></TextInput>
                        <TextInput placeholder="Username" name="username"></TextInput>
                        <TextInput placeholder="Email" name="email"></TextInput>
                        <TextInput placeholder="password" name="password" type="password"></TextInput>
                        <ErrorMessage name="error" render={() =>
                                <ValidationError errors={errors.error}></ValidationError>}
                        ></ErrorMessage>

                        <Button
                            disabled={!isValid || !dirty || isSubmitting}
                            positive
                            content="Register"
                            type="submit" fluid></Button>
                    </Form>
                )}
        </Formik>
    );
})