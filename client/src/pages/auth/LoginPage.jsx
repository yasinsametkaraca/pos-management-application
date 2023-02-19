import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Button, Carousel, Checkbox, Form, Input, message} from "antd";
import AuthCarousel from "../../components/auth/AuthCarousel";
import {useNavigate} from "react-router";

const LoginPage = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const login = async (values) => {
        setLoading(true)
        try {
            const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/auth/login", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });
            const user = await res.json();
            if (res.status === 200) {
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        username: user.username,
                        email: user.email,
                    })
                );
                message.success("Login Successful");
                navigate("/");
            } else {
                message.error("Login Failed")
            }
            setLoading(false);
        } catch (error) {
            message.error("Something Went Wrong")
            setLoading(false);
        }
    };

    return (
        /*h-screen = 100vh yani tam ekran kaplıcak*/
        <div className="h-screen">
            <div className="flex justify-between h-full">
                <div className="flex flex-col h-full justify-center relative xl:px-20 px-10 w-full bg-gray-200">
                    <h1 className="text-center text-6xl font-bold mb-3">YSK</h1>
                    <Form onFinish={login} layout="vertical" initialValues={{remember: false}}>
                        <Form.Item
                            label="E-mail"
                            name={"email"}
                            rules={[{required: true, message: "E-mail is required!",},]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name={"password"}
                            rules={[{required: true, message: "Password is required!",},]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item name={"remember"} valuePropName="checked">
                            <div className="flex justify-between items-center">
                                <Checkbox>Remember me</Checkbox>
                                <Link to={"/"}>Forgot Password?</Link>
                            </div>
                        </Form.Item>
                        <Form.Item>
                            <Button loading={loading} type="primary" htmlType="submit" className="w-full" size="large">Login</Button>
                        </Form.Item>
                    </Form>
                    <div className="flex justify-center absolute left-0 bottom-12 w-full">Do not you have an account yet?
                        <Link to="/register" className="text-blue-600 font-bold">Register</Link>
                    </div>
                </div>
                <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex bg-purple-600 hidden justify-center items-center">
                    <div className={"w-full h-full flex justify-center items-center"}>
                        <div className={"w-full"}>
                            <Carousel autoplay className={"px-6"}>
                                <AuthCarousel img={"/img/pos.png"} text={"Welcome to Post of Sale Application"} title={"Pos"}></AuthCarousel>
                                <AuthCarousel img={"/img/responsive.png"} text={"Fully compatible with all devices"} title={"Responsive"}></AuthCarousel>
                                <AuthCarousel img={"/img/earthquake.png"} text={"Get better soon "} title={"Turkey Earthquake"}></AuthCarousel>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default LoginPage;