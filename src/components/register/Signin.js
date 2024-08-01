import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { setUserid, setUsertoken } from '../../actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Signin() {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        axios.post('/login', data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            const userId = res.data.user.id;
            const token = res.data.token;
            localStorage.setItem('userId', JSON.stringify(userId));
            localStorage.setItem('token', JSON.stringify(token));
            dispatch(setUserid(userId));
            dispatch(setUsertoken(token));
            navigate('/home');
        }).catch((error) => {
            console.log(error);
        })
    };

    return (
        <>
            <div id="pills-login" >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-center mb-2">
                        <p>Sign in with:</p>
                        <button type="button" className="btn btn-link btn-floating mx-1">
                            <FontAwesomeIcon icon={faFacebookF} size="1x" className="mr-3" />
                        </button>
                        <button type="button" className="btn btn-link btn-floating mx-1">
                            <FontAwesomeIcon icon={faGoogle} size="1x" />
                        </button>
                        <button type="button" className="btn btn-link btn-floating mx-1">
                            <FontAwesomeIcon icon={faTwitter} size="1x" className="mr-3" />
                        </button>
                        <button type="button" className="btn btn-link btn-floating mx-1">
                            <FontAwesomeIcon icon={faGithub} size="1x" className="mr-3" />
                        </button>
                    </div>

                    <p className="text-center">or:</p>

                    <div className="form-outline mb-4">
                        <input type="email" id="loginName" className="form-control" defaultValue="" {...register("email", { required: true })} />
                        <label className="form-label" htmlFor="loginName">Email or username</label>
                    </div>

                    <div className="form-outline mb-4">
                        <input type="password" id="loginPassword" className="form-control" {...register("password", { required: true })} />
                        <label className="form-label" htmlFor="loginPassword">Password</label>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-6 d-flex justify-content-center">
                            <div className="form-check mb-3 mb-md-0">
                                <input className="form-check-input" type="checkbox" value=""  {...register("logincheck")} />
                                <label className="form-check-label" htmlFor="loginCheck"> Remember me </label>
                            </div>
                        </div>

                        <div className="col-md-6 d-flex justify-content-center">
                            <a href="#!">Forgot password?</a>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

                </form>
            </div>
        </>
    )
}

export default Signin