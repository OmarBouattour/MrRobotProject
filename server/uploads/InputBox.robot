*** Settings ***
Library  SeleniumLibrary

*** Variables ***
${browser}  chrome
${url}  https://github.com/


*** Test Cases ***
InputTest     #step
    create webdriver    Chrome     executable_path=Drivers/chromedriver90.exe
    open browser    ${url}  Chrome
    maximize browser window
    title should be     GitHub: Where the world builds software · GitHub

MenuTest     #step
    ${"menu"}  set variable   xpath:/html/div[1]/header/div/div[2]/nav/ul/li[55555]/a
    page should contain element     ${"menu"}

Clicklogin     #step
    click link  xpath:/html/body/div[1]/header/div/div[2]/div[2]/a[1]
    ${"email_txt"}  set variable   id:login_field

    #verify if the input is visible and enabled
    element should be visible  ${"email_txt"}
    element should be enabled  ${"email_txt"}

    #element should not be visible  ${"email_txt"}

    sleep   2
    input text  ${"email_txt"}  omar.bouattour@esprit.tn
    #add 5 seconds delay
    sleep   5
    clear element text  ${"email_txt"}

    sleep   3
    close browser



*** Keywords ***

