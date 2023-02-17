import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Button, Carousel, Form, Input, message} from "antd";
import AuthCarousel from "../../components/auth/AuthCarousel";
import {useNavigate} from "react-router";

const RegisterPage = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const register = (values) => {
        setLoading(true)
        try {
            fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            }).then((res) => {
                if(res.ok){
                    message.success("Registration Successful");
                    navigate("/login");
                }else
                    message.error("Registration Failed")
            })
            setLoading(false)
        } catch (error) {
            message.error("Something Went Wrong");
            setLoading(false)
        }
    }

   return (
      /*h-screen = 100vh yani tam ekran kaplıcak*/
       <div className="h-screen">
           <div className="flex justify-between h-full">
               <div className="flex flex-col h-full justify-center relative xl:px-20 px-10 w-full bg-gray-200">
                   <h1 className="text-center text-6xl font-bold mb-3">YSK</h1>
                   <Form onFinish={register} layout="vertical">
                       <Form.Item
                           label="Username"
                           name={"username"}
                           rules={[{required: true, message: "Username is required!",},]}>
                           <Input />
                       </Form.Item>
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
                       <Form.Item
                           name="passwordAgain"
                           label="Confirm Password"
                           dependencies={['password']}
                           hasFeedback
                           rules={[
                               {
                                   required: true,
                                   message: 'Please confirm your password!',
                               },
                               ({ getFieldValue }) => ({
                                   validator(_, value) {
                                       if (!value || getFieldValue('password') === value) {
                                           return Promise.resolve();
                                       }
                                       return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                   },
                               }),
                           ]}
                       >
                           <Input.Password />
                       </Form.Item>
                       <Form.Item>
                           <Button loading={loading} type="primary" htmlType="submit" className="w-full" size="large">Register</Button>
                       </Form.Item>
                   </Form>
                   <div className="flex justify-center absolute left-0 bottom-12 w-full">Do you have an account?
                       <Link to="/login" className="text-blue-600 font-bold">Login</Link>
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
export default RegisterPage;