*** Settings ***
Library  SeleniumLibrary

*** Variables ***
${browser}  chrome
${url}  https://github.com/


*** Test Cases ***
OpenBrowser1     #step
    open browser    ${url}  ${browser}
LoginTest  #step

    Login IntoApp
Closebrowser   #step
    close browser
*** Keywords ***
Login IntoApp
    click link  xpath:/html/body/div[1]/header/div/div[2]/div[2]/a[1]
    input text  id:login_field  omar.bouattour@esprit.tn
    input text  id:password  Amrouch123
    click element   xpath://*[@id="login"]/div[4]/form/div/input[12]
