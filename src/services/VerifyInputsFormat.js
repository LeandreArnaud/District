//check if email is valid format
export function isEmailValid(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email))){
      return(true)
    }
    else{
      return(false)
    }
}


// check if password is long enought
export function isPasswordValid(password){
    if (password.length < 6){
      return(false)
    }
    else{
      return(true)
    }
}