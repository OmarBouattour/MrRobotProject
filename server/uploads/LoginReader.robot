*** Settings ***
Library  SeleniumLibrary
Library     CryptoLibrary    ommarr    variable_decryption=False

*** Variables ***

${url}  https://40.115.10.191:8443/bonita/loginAdvaas.jsp?redirectUrl=/bonita/apps/advaas
${enc_user}=   crypt:X9lU2HbXbFIUuf80/O7d46j3mvnBg1fuIRHp4uCbN1WASf1MKnB1ifhGRR0Ag1D9O2diH1bsGfp07Z3QSpC/RHkLUgfQrTuJbsUxrPxpPc4/gHTU7Yg=
${enc_pwd}=    crypt:ltj2W+YaX/dC/FlSDFCgiDNUBkmnGYjzJexMUIdrRRqFpukDaH2Zyn2jmtJC2Wk9g8iowoI2rmofQCG2qRaRVgnG7fo=


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
    ${user}=    Get Decrypted Text    ${enc_user}
    input text  id:username  ${user}
    ${password}=    Get Decrypted Text    ${enc_pwd}
    input text  id:password  ${password}

    #press login
    click element   xpath://*[@id="LoginForm"]/div[3]/input
    #CHeck reader name
    sleep   2
    page should contain element    xpath:/html/body/div/div[1]/div/div/custom-advaas-menu/div/div/form/div[3]/div[1]/span

    close browser


*** Keywords ***




