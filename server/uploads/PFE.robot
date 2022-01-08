*** Settings ***
Library  SeleniumLibrary

*** Variables ***

${url}  http://localhost:4200/


*** Test Cases ***
OpenBrowser     #step
    set selenium speed    1 seconds
    create webdriver    Firefox     executable_path=Drivers/geckodriver64.exe
    open browser    ${url}  Firefox  options=add_argument("--ignore-certificate-errors")
    maximize browser window
Login   #step
    input text  xpath://html/body/app-root/div/app-login/div/div/div/div/div[2]/form/div[1]/input  omar.bouattour@esprit.tn
    click element   xpath://html/body/app-root/div/app-login/div/div/div/div/div[2]/form/button
    page should contain element     xpath://html/body/app-root/div/app-login/div/div/div/h5
    clear element text  xpath://html/body/app-root/div/app-login/div/div/div/div/div[2]/form/div[1]/input
    input text  xpath://html/body/app-root/div/app-login/div/div/div/div/div[2]/form/div[1]/input  admin
    input text  xpath://html/body/app-root/div/app-login/div/div/div/div/div[2]/form/div[2]/input  admin
    click element   xpath://html/body/app-root/div/app-login/div/div/div/div/div[2]/form/button
    wait until page contains element    xpath://html/body/app-root/div/app-admininterface/div[2]/div[2]/div/div[1]/div/div[1]/button
AdminPage   #step
    click element   xpath://html/body/app-root/div/app-admininterface/div[2]/div[2]/div/div[1]/div/div[1]/button
ArchiveTestCase     #step
    click element   xpath://html/body/app-root/div/app-admininterface/div[2]/div[2]/div/div[1]/div/div[2]/ul/li[3]/button
    handle alert    accept
    click element   xpath://html/body/app-root/div/app-admininterface/div[1]/button/i
    click element   xpath://html/body/app-root/div/app-admininterface/div[1]/ul/li[2]/a
    sleep    1
    click element   xpath://html/body/app-root/app-header/nav/img
WriteTestCase   #step
    click element   xpath://html/body/app-root/div/app-admininterface/div[1]/button/i
    click element   xpath://html/body/app-root/div/app-admininterface/div[1]/ul/li[3]/a
    input text  xpath://html/body/app-root/div/app-writetest/div/input  test
    click element    xpath://html/body/app-root/div/app-writetest/ngx-codemirror/div/div[6]/div[1]/div/div
    Execute javascript
    ...    _editor = document.querySelectorAll("div.CodeMirror")[0].CodeMirror;
    ...    _editor.setValue("Hello world!");
    click element    xpath://html/body/app-root/div/app-writetest/button

Register    #step
    click element   xpath://html/body/app-root/app-header/nav/div/ul[2]/div/button
    click element   xpath://html/body/app-root/app-header/nav/div/ul[2]/div/ul/li/a
    input text  xpath://html/body/app-root/div/app-register/div/div/div/div/div[2]/form/div[1]/input    admin
    click element   xpath://html/body/app-root/div/app-register/div/div/div/div/div[2]/form/button
    input text  xpath://html/body/app-root/div/app-register/div/div/div/div/div[2]/form/div[1]/input    newreader
    input text  xpath://html/body/app-root/div/app-register/div/div/div/div/div[2]/form/div[2]/input    newreader
    input text  xpath://html/body/app-root/div/app-register/div/div/div/div/div[2]/form/div[3]/input    reader
    click element   xpath://html/body/app-root/div/app-register/div/div/div/div/div[2]/form/button
    #sleep    2

    #wait until page contains    xpath://html/body/app-root/div/app-admininterface/div[2]/div[3]/div/div[1]/div/div[1]/button
Logout  #step
    click element   xpath://html/body/app-root/app-header/nav/div/ul[2]/a
LoginAsReader     #step
    input text  xpath://html/body/app-root/div/app-login/div/div/div/div/div[2]/form/div[1]/input  newreader
    input text  xpath://html/body/app-root/div/app-login/div/div/div/div/div[2]/form/div[2]/input  newreader
    click element   xpath://html/body/app-root/div/app-login/div/div/div/div/div[2]/form/button
    sleep    3
    close browser
*** Keywords ***

