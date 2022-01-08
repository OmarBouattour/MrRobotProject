function GetUrl() {
    param(
        [string]$orgUrl, 
        [hashtable]$header, 
        [string]$AreaId
    )

    # Area ids
    # https://docs.microsoft.com/en-us/azure/devops/extend/develop/work-with-urls?view=azure-devops&tabs=http&viewFallbackFrom=vsts#resource-area-ids-reference
    # Build the URL for calling the org-level Resource Areas REST API for the RM APIs
    $orgResourceAreasUrl = [string]::Format("{0}/_apis/resourceAreas/{1}?api-preview=5.0-preview.1", $orgUrl, $AreaId)

    # Do a GET on this URL (this returns an object with a "locationUrl" field)
    $results = Invoke-RestMethod -Uri $orgResourceAreasUrl -Headers $header

    # The "locationUrl" field reflects the correct base URL for RM REST API calls
    if ("null" -eq $results) {
        $areaUrl = $orgUrl
    }
    else {
        $areaUrl = $results.locationUrl
    }

    return $areaUrl
}

$orgUrl = "https://dev.azure.com/fodservices"
$personalToken = "jrx646kymgn6hcci4vrfq5drksvu57bdtoaa5pwnrzdoml3kmxha"

Write-Host "Initialize authentication context" -ForegroundColor Yellow
$token = [System.Convert]::ToBase64String([System.Text.Encoding]::ASCII.GetBytes(":$($personalToken)"))
$header = @{authorization = "Basic $token"}

# DEMO 1 List of projects
Write-Host "Demo 1"
$coreAreaId = "79134c72-4a58-4b42-976c-04e7115f32bf"
$tfsBaseUrl = GetUrl -orgUrl $orgUrl -header $header -AreaId $coreAreaId

# https://docs.microsoft.com/en-us/rest/api/azure/devops/core/projects/list?view=azure-devops-rest-5.1
$projectsUrl = "$($tfsBaseUrl)_apis/projects?api-version=5.1"

$projects = Invoke-RestMethod -Uri $projectsUrl -Method Get -ContentType "application/json" -Headers $header

$projects.value | ForEach-Object {
    Write-Host $_.name
}

# DEMO 2 List of repositories
#Write-Host "Demo 2"
#$relDefUrl = "$($tfsBaseUrl)_apis/git/repositories?api-version=6.0-preview.1"
#$output = Invoke-RestMethod -Uri $relDefUrl -Method Get -ContentType "application/json" -Headers $header
#$output.value | ForEach-Object {
#    Write-Host $_.id,$_.name
#}

# DEMO 3 List of testplans
Write-Host "Demo 3"
$coreAreaId = "3b95fb80-fdda-4218-b60e-1052d070ae6b"
$tfsBaseUrl = GetUrl -orgUrl $orgUrl -header $header -AreaId $coreAreaId

$relDefUrl = "$($tfsBaseUrl)/Training%20projects/_apis/testplan/Plans/70152/Suites/70154/TestPoint?api-version=6.1-preview.2"
try {
    $output = Invoke-RestMethod -Uri $relDefUrl -Method Get -ContentType "application/json" -Headers $header

}
catch{
    Write-Host "StatusCode:" $_.Exception.Response.StatusCode.value__ 
    Write-Host "StatusDescription:" $_.Exception.Response.StatusDescription

}
$output.value | ForEach-Object {
    [pscustomobject]@{
        id = $_.id
        outcome = $_.results.outcome
        idtc = $_.testCaseReference.id
    }
} | ConvertTo-Json | Out-File -FilePath ..\..\mrrobot2\src\assets\tfs.json

#$_.id, $_.results.outcome, $_.testCaseReference.name	| Add-Content -Path .\tfs.json


# DEMO 3 List of testplans
#Write-Host "Demo 4"
#$coreAreaId = "3b95fb80-fdda-4218-b60e-1052d070ae6b"
#$tfsBaseUrl = GetUrl -orgUrl $orgUrl -header $header -AreaId $coreAreaId
# $body ="
# [
#    {
#            `"id`": 11432,
#            `"results`": {
#                
#                `"outcome`": `"passed`"
#            }
#    }
#]

# "
#$relDefUrl = "$($tfsBaseUrl)/Training%20projects/_apis/testplan/Plans/70152/Suites/70154/TestPoint?api-version=6.1-preview.2"
#try {
#    $output = Invoke-RestMethod -Uri $relDefUrl -Method Patch -Body $body -ContentType "application/json" -Headers $header

#}
#catch{
#    Write-Host "StatusCode:" $_.Exception.Response.StatusCode.value__ 
#    Write-Host "StatusDescription:" $_.Exception.Response.StatusDescription

#}
