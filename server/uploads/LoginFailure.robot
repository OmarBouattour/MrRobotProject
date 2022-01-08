*** Settings ***
Library  SeleniumLibrary
Library     CryptoLibrary    ommarr    variable_decryption=False

*** Variables ***

${url}  https://40.115.10.191:8443/bonita/loginAdvaas.jsp?redirectUrl=/bonita/apps/advaas
${enc_user}=   crypt:ZJsfC8LxRN1e5QgwX2BNtR9QaidC011mgNhEW/kTX36lWt6ctYQDRW0URVMm80R+oQ974Y9IIiP27TgRmEMTmJH3zZQOlLmmtx/5xDq54WA=
${enc_pwd}=    crypt:WC6BwiXTxIyatkGfU7jl7C8ZQn/KirQgzd04EHyeKhpC4uW7qt7PSMjrfAeoPT4LZQvGbgU3RQsOuOFX1kE=


*** Test Cases ***
LoginTest     #step

    #uncomment the next line if you want to change browser

    #create webdriver    chrome     executable_path='D:/PFE/pythonProject1/Drivers/geckodriver64.exe'
    #5 seconds between each line
    set selenium speed    2 seconds
    create webdriver    Chrome     executable_path=Drivers/chromedriver90.exe
    open browser    ${url}  Chrome  options=add_argument("--ignore-certificate-errors")
    maximize browser window
    #fill the login form
    input text  id:username  WrongLogin
    input text  id:password  WrongPassword

    #press login
    click element   xpath://*[@id="LoginForm"]/div[3]/input
    sleep   2
    page should contain element     xpath://*[@id="LoginForm"]/p

    close browser


*** Keywords ***




