*** Settings ***
Library  SeleniumLibrary

*** Variables ***

${url}  https://40.115.10.191:8443/bonita/loginAdvaas.jsp?redirectUrl=/bonita/apps/advaas


*** Test Cases ***
LoginTest     #step

    #uncomment the next line if you want to change browser

    #create webdriver    chrome     executable_path='D:/PFE/pythonProject1/Drivers/geckodriver64.exe'
    #5 seconds between each line
    set selenium speed    2 seconds
    open browser    ${url}  chrome  options=add_argument("--ignore-certificate-errors")
    maximize browser window
    #fill the login form
    input text  id:username  Apricotester-EN@interparking.com
    input text  id:password  apricotesteren

    #press login
    click element   xpath://*[@id="LoginForm"]/div[3]/input
    sleep   3

CheckMenu     #step
    set selenium speed    1 seconds
    wait until page contains element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[1]/a
AdvaasLogo     #step
    #ADVAAS
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[1]/a
ParkingStateMenu     #step
    #Parking State
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[2]/ul/li[1]/a
MonthlyClosingMenu     #step
    #monthly closing
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[2]/ul/li[2]/a
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[2]/ul/li[2]/ul/li[1]/a
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[2]/ul/li[2]/ul/li[2]/a
OperationalManagementMenu     #step
    #Operational Management
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[2]/ul/li[3]/a
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[2]/ul/li[3]/ul/li[1]/a
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[2]/ul/li[3]/ul/li[2]/a
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[2]/ul/li[3]/ul/li[3]/a
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[2]/ul/li[3]/ul/li[4]/a
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[2]/ul/li[3]/ul/li[5]/a
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[2]/ul/li[3]/ul/li[6]/a
ConsultationMenu     #step
    #Consultation
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[2]/ul/li[4]/a
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[2]/ul/li[4]/ul/li[1]/a
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[2]/ul/li[4]/ul/li[2]/a
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[2]/ul/li[4]/ul/li[3]/a
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[2]/ul/li[4]/ul/li[4]/a
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[2]/ul/li[4]/ul/li[5]/a
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[2]/ul/li[4]/ul/li[6]/a
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[2]/ul/li[4]/ul/li[7]/a
ConfigMenu     #step
    #configuration
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[2]/ul/li[5]/a
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[2]/ul/li[5]/ul/li/a
HelpMenu     #step
    #help
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[2]/ul/li[6]/a
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[2]/ul/li[6]/ul/li[1]/a
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[2]/ul/li[6]/ul/li[2]/a
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[2]/ul/li[6]/ul/li[3]/a
AdminName     #step
    #admin
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[3]/div[1]/span
LogoutButton     #step
    #logout
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[3]/div[2]/img

    close browser


*** Keywords ***




