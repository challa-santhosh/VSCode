        
        class userClass{
            constructor(userName,userEmail,userAddress,userPassword)
            {
                this.userName=userName
                this.userEmail=userEmail
                this.userAddress=userAddress
                this.userPassword=userPassword
            }

            userObject(){
                const random_id=Math.floor(Math.random() * 1000000)
                return({
                    id:random_id,
                    name:this.userName,
                    email:this.userEmail,
                    address:this.userAddress,
                    password:this.userPassword
                })
            }
        }
        
        var span = document.getElementsByClassName("close")[0];
        var modal = document.getElementById("myModal");
        const openForm=()=> {
            modal.style.display = "block";
        }
        span.onclick = () => {
            modal.style.display = "none";
            clearFields();
        }
        var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
        };

        function success(pos) {
        var crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        }

        function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        }
        const validateData = (userName='',email='',data=null) => {
            if(data)
            {
                let users=JSON.parse(data)
                let user=users.filter(user => user.name === userName)
                if(user.length>0)
                {
                    alert('username already exist, please try something else');
                    return false;
                }
            }
            if(typeof(email)=='string' && email.includes('@') && validateEmail(email))
                return true;
            else{
                alert('please enter valid email');
                return false;
            }
        }
        const validateEmail = (email) => {
            return String(email)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );
        };
        const findCoordinates=()=>{navigator.geolocation.getCurrentPosition(success, error, options);}
        const clearFields = () =>{
            document.getElementById('userName').value='';
            document.getElementById('userEmail').value='';
            document.getElementById('userAddress').value='';
            document.getElementById('userPassword').value='';
        }
        const clearLoginFields = () =>{
            document.getElementById('loginName').value='';
            document.getElementById('loginPassword').value='';
        }
        const addUser = () =>{
            let data=localStorage.getItem('wholeData')
            const userName = document.getElementById('userName').value;
            const userEmail = document.getElementById('userEmail').value;
            const userAddress = document.getElementById('userAddress').value;
            const userPassword = document.getElementById('userPassword').value;
            const random_id=Math.floor(Math.random() * 1000000)
            // const user={
            //     id:random_id,
            //     name:userName,
            //     email:userEmail,
            //     address:userAddress,
            //     password:userPassword
            // }
            const newUser = new userClass(userName,userEmail,userAddress,userPassword)
            const user = Object.assign({},newUser.userObject())
            if(validateData(userName,userEmail,data))
            {
                if(!data)
                {
                    const users=[user]
                    localStorage.setItem('wholeData',JSON.stringify(users))
                }
                else{
                    let users=JSON.parse(data)
                    users=[...users,user]
                    localStorage.setItem('wholeData',JSON.stringify(users))
                }
                alert('User added successfully..., try to login now...')
                clearFields();
                modal.style.display = "none";
            }
        }

        const login = () =>{
            let data=localStorage.getItem('wholeData')
            const loginName = document.getElementById('loginName').value;
            const loginPassword = document.getElementById('loginPassword').value;
            if(!loginName || !loginPassword)
            {
                alert('please enter username and password')
            }
            else{
                const users = data?JSON.parse(data):[]
                const [user]=users.filter(user=>user.name===loginName)
                if(!user)
                {
                    alert("user doesn't exist...")
                    return;
                }
                if(user?.password===loginPassword)
                {    
                    clearLoginFields()
                    sessionStorage.setItem('currentUser',JSON.stringify(user))
                    window.location.href=`file:///C:/Users/2079341/VSCode/HTML/posts.html`
                }
                else{
                    alert('password is incorrect..., try again')
                }
            }
        }
        function changeColor(color) {
            return function() {
              document.getElementById('loginBtn').style.backgroundColor = color;
            };
        }
        //var changeCol=changeColor('blue');
        document.getElementById('loginBtn').onmouseover=changeColor('blue');
        document.getElementById('loginBtn').onmouseleave=changeColor('#efefef');
