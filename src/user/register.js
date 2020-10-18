import  Notification from '../general/Notification';
import  errorNotification from '../general/errorNotification';
import React from 'react';
import getFactory from '../request'
import { Form, Input, Checkbox, } from 'antd';
import { useHistory } from 'react-router-dom';


const Register = () => {
    const API = getFactory('user');
    const history = useHistory();
    async function register(data){
        try{
            const res = await API.signUp(data);
            console.log(res)
            Notification("Đăng ký tài khoản thành công!");
            history.push("/login");
        }catch (e) {
            if(e.request.status === 0){
                errorNotification("Lỗi mạng!");
            }else if (e.request.status === 400){
                if(e.response.data.username){errorNotification("Tài khoản đã tồn tại");}
                else errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng ký lại")
            }else errorNotification(e.message);
            
        }
    }
    
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
  const onFinish = values => {
    // console.log(values)
    register(values)
  };


  return (
    <div className="wrapper fadeInDown">
        <div id="formContent">
            <h2 className="inactive underlineHover"><a href='/login'> Đăng nhập </a></h2>
            <h2 className="active">Đăng ký</h2>

            <div className="fadeIn first">
                {/* <img src="#" /> */}
            </div>
            <Form
                name="register"
                onFinish={onFinish}

                scrollToFirstError
            >

                <Form.Item 
                    name="username"
                    rules={[
                        {
                            required:true,
                            message: 'Vui lòng nhập tên tài khoản',
                        }
                    ]}
                >
                    <Input className="fadeIn second"  placeholder="Username" maxLength="50" />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                    {
                        type: 'email',
                        message: 'Không đúng định dạng email!',
                    },
                    {
                        required: true,
                        message: 'Vui lòng nhập email của bạn',
                    },
                    ]}
                >
                    <Input className="fadeIn second"  placeholder="Email" maxLength="100" />
                </Form.Item>
                <Form.Item 
                    name="first_name"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập họ của bạn',
                        },
                        ]}
                    >
                        <Input className="fadeIn second"  placeholder="First name" maxLength="100" />
                    </Form.Item>
                    <Form.Item 
                    name="last_name"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên của bạn',
                        },
                        ]}
                >
                    <Input className="fadeIn second"  placeholder="Last Name" maxLength="100" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập lại mật khẩu của bạn',
                    },
                    ]}
                    
                >
                    <Input type='password' className="fadeIn second"  placeholder="Password" maxLength="100" />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                    {
                        required: true,
                        message: 'VUi lòng nhập lại mật khẩu của bạn',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject('Mật khẩu không trùng khớp');
                        },
                    }),
                    ]}
                >
                    <Input type='password' className="fadeIn second"  placeholder="Confirm Password" maxLength="100" />
                </Form.Item>

                <Form.Item>
                    <Form.Item
                        name="agreement"
                        valuePropName="checked" noStyle
                        rules={[
                        { validator:(_, value) => value ? Promise.resolve() : Promise.reject('Yêu cầu chấp nhận điều khoản sử dụng trước khi đăng ký') },
                        ]}
                        {...tailFormItemLayout}
                    >
                        <Checkbox>
                        Tôi đồng ý với <a href="https://viblo.asia/p/xu-ly-loi-voi-try-catch-trong-javascript-Eb85oX8kK2G">điều khoản</a> sử dụng
                        </Checkbox>
                    </Form.Item>
                </Form.Item>
                <input type="submit" className="fadeIn fourth" value="Đăng ký" />
            </Form>
            <div id="formFooter">
                <a className="underlineHover" href="/forgot-password">Quên mật khẩu?</a>
            </div>

        </div>
    </div>
    )
}
export default Register;