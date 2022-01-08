*** Settings ***
Library  SeleniumLibrary

*** Variables ***
${browser}  chrome
${url}  http://www.practiceselenium.com/practice-form.html


*** Test Cases ***
TestingDropdownsAndLists     #step
    open browser    ${url}  ${browser}
    maximize browser window

    #selecting from dropdown (id)   (option)
    select from list by label   continents  Europe
    sleep   3
    select from list by index   continents  6
    #select from list by value   continents     value

    #selecting from list box (id)   (option)
    select from list by label   selenium_commands  Switch Commands
    sleep   1
    select from list by label   selenium_commands   Wait Commands
    sleep   1
    unselect from list by label   selenium_commands     Switch Commands



*** Keywords ***

