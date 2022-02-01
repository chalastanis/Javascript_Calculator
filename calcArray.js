        //! selectors

        const monitor = document.querySelector('.monitor')
        const monitor_sm = document.querySelector('#monitor_sm')
        
        const clear = document.querySelector('#btn-C');
        const equal = document.querySelector('#btn-E');
        
        const dot = document.querySelector('#btn-d');
        const add = document.querySelector('#btn-A');
        const subtract = document.querySelector('#btn-S');
        const multiply = document.querySelector('#btn-M');
        const devide = document.querySelector('#btn-D');
        const num0 = document.querySelector('#btn0');
        const num1 = document.querySelector('#btn1');
        const num2 = document.querySelector('#btn2');
        const num3 = document.querySelector('#btn3');
        const num4 = document.querySelector('#btn4');
        const num5 = document.querySelector('#btn5');
        const num6 = document.querySelector('#btn6');
        const num7 = document.querySelector('#btn7');
        const num8 = document.querySelector('#btn8');
        const num9 = document.querySelector('#btn9');
        
        //! Event Listeners
        
        clear.addEventListener('click', clearView);
        
        equal.addEventListener('click', resultNum);
        
        dot.addEventListener('click', pressedButton);
        add.addEventListener('click', pressedButton);
        subtract.addEventListener('click', pressedButton);
        multiply.addEventListener('click', pressedButton);
        devide.addEventListener('click', pressedButton);
        num0.addEventListener('click', pressedButton);
        num1.addEventListener('click', pressedButton);
        num2.addEventListener('click', pressedButton);
        num3.addEventListener('click', pressedButton);
        num4.addEventListener('click', pressedButton);
        num5.addEventListener('click', pressedButton);
        num6.addEventListener('click', pressedButton);
        num7.addEventListener('click', pressedButton);
        num8.addEventListener('click', pressedButton);
        num9.addEventListener('click', pressedButton);


        //! Functions

        let disValue = "";
        let arrayNum =[];
        let operator = false; // το χρησιμοποιω για να ελεγχω την περιπτωση που θελω να αλαξω την μαθηματικη πραξη
        let monitor_sm_string = "";
        let counter = 0;

        //! Operation buttons
        function pressedButton() {
            let insertedKey = this.innerText;
            
            lotOfDigits(disValue);
            

            if(insertedKey !== "+" && insertedKey !== "-" && insertedKey !== "*" && insertedKey !=="/"){
                if(insertedKey === "." & monitor.innerText === "0" & counter === 0){
                    disValue = "0.";
                    counter++;
                }
                else if(insertedKey === "." & monitor.innerText != "0" & counter === 0 & operator===true){
                    disValue = "0.";
                    counter++;
                }
                else if(insertedKey === "." & monitor.innerText != "0" & counter === 0){
                    disValue = disValue + insertedKey;
                    counter++;
                }
                else if(insertedKey === "." & counter === 1){ 
                    // no action 
                }    
                else{
                    disValue = disValue + insertedKey;
                }
                
                monitor.innerText = disValue;
                operator = false;
            }

            if((insertedKey === "+" || insertedKey === "-" || insertedKey === "*" || insertedKey === "/") && operator === false){
                operator = true;
                disValue = "";
                counter = 0;
                
                if ((insertedKey === "*" || insertedKey === "/") && arrayNum.length > 1){     // κανω ελεγχο ωστε αν χρειαστει να βαλω παρενθεσεις               
                    arrayNum.push(monitor.innerText);

                    lotOfDigits(monitor_sm_string = "(" + arrayNum.join("") + ")");
                    arrayNum = [];
                    lotOfDigits(arrayNum.push(monitor_sm_string));

                    arrayNum.push(insertedKey);                    
                    lotOfDigits(monitor_sm_string = arrayNum.join(""));
                } else{
                    arrayNum.push(monitor.innerText);
                    arrayNum.push(insertedKey);
                    lotOfDigits(monitor_sm_string = arrayNum.join(""));
                }
                lotOfDigits(monitor_sm.innerText = monitor_sm_string);

            } else if((insertedKey === "+" || insertedKey === "-" || insertedKey === "*" || insertedKey === "/") && operator === true){
                arrayNum.splice(-1,1,insertedKey);
                lotOfDigits(monitor_sm.innerText = arrayNum.join(""));
            }
        }

        //! equal button

        function resultNum(resValue){
            arrayNum.push(monitor.innerText);
            lotOfDigits(monitor_sm.innerText = arrayNum.join(""));
            let result = eval(arrayNum.join(""));
            lotOfDigits(String(result));
            monitor.innerText = result;
            arrayNum= [];
            disValue="";
        }

        //! CE button
        
        function clearView(){ 
            disValue = "";
            arrayNum =[];
            operator = false; 
            monitor_sm_string = "";
            counter = 0;
            monitor.innerText = "0";
            monitor_sm.innerText = "";
            document.getElementById('view').style.fontSize = '60px';
        }

        //! View lenght function for

        function lotOfDigits(num) {
            if (num.length > 35 ){
                // alert("Too big number!");
                document.getElementById('view').style.fontSize = '10px';
            }else if (num.length > 26 ){
                document.getElementById('view').style.fontSize = '15px';
                document.getElementById('monitor_sm').style.fontSize = '10px';
            }else if (num.length > 14 ){
                document.getElementById('view').style.fontSize = '20px';
            }else if (num.length > 8 ){
                document.getElementById('view').style.fontSize = '35px';
            }else{
                document.getElementById('view').style.fontSize = '60px';
            }
        }