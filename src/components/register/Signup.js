import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { setUserid, setUsertoken } from '../../actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Signup() {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        axios.post('/register', data).then((res) => {
            // const userId = res.data.user.id;
            // const token = res.data.token;
            // localStorage.setItem('userId', JSON.stringify(userId));
            // localStorage.setItem('token', JSON.stringify(token));
            // dispatch(setUserid(userId));
            // dispatch(setUsertoken(token));
            // navigate('/home');
            Swal.fire({
                icon: 'success',
                title: 'Account created',
                text: 'Won\'t be able to login before email verfication..',
                timer: 5000,
                timerProgressBar: true,
                showConfirmButton: false
            });
        })
    }

    return (
        <>
            <div id="pills-register">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-center mb-3">
                        <p>Sign up with:</p>
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

                    <div className="form-outline mb-2">
                        <input type="text" id="registerName" className="form-control" {...register('name', { required: true })} />
                        <label className="form-label" htmlFor="registerName">Name</label>
                    </div>

                    {/* <div className="form-outline mb-2">
                        <input type="text" id="registerUsername" className="form-control" />
                        <label className="form-label" htmlFor="registerUsername">Username</label>
                    </div> */}

                    <div className="form-outline mb-2">
                        <input type="email" id="registerEmail" className="form-control" {...register('email', { required: true })} />
                        <label className="form-label" htmlFor="registerEmail">Email</label>
                    </div>

                    <div className="form-outline mb-2">
                        <input type="password" id="registerPassword" className="form-control" {...register('password', { required: true })} />
                        <label className="form-label" htmlFor="registerPassword">Password</label>
                    </div>

                    {/* <div className="form-outline mb-2">
                        <input type="password" id="registerRepeatPassword" className="form-control" />
                        <label className="form-label" htmlFor="registerRepeatPassword">Repeat password</label>
                    </div> */}

                    <div className="form-check d-flex justify-content-center mb-2">
                        <input className="form-check-input me-2" type="checkbox" value="" id="registerCheck" />
                        <label className="form-check-label" htmlFor="registerCheck">
                            I have read and agree to the terms
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mb-3">Sign up</button>
                </form>
            </div>
        </>
    )
}

export default Signup