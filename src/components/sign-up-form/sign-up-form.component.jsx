import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/fitebase.utils";
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();

        if(password != confirmPassword) {
            alert('Paswords do not match');
            return;

        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();

            
        } catch (e) {
            if(e.code === 'auth/email-already-in-use'){
                alert('Email already in use')
            } else {
                console.log(e);
            }
            
        }

    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    };

    return (
        <div>
            <h1>Sign up with email and password</h1>
            <form onSubmit = {handleSubmit} action="">
                <label >Display Name</label>
                <input 
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="displayName" 
                    alue={displayName}/>
                 <label >Email</label>
                <input 
                    type= "email" 
                    required 
                    onChange={handleChange} 
                    name = "email" 
                    value = {email}/>
                 <label >Password</label>
                <input 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name = "password" 
                    value = {password}/>
                 <label >Confirm Password</label>
                <input 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name = "confirmPassword" 
                    value = {confirmPassword}/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;