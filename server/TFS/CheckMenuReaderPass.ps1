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

# DEMO Login Admin Pass
Write-Host "Login Admin Pass"
$coreAreaId = "3b95fb80-fdda-4218-b60e-1052d070ae6b"
$tfsBaseUrl = GetUrl -orgUrl $orgUrl -header $header -AreaId $coreAreaId
 $body ="
 [
    {
            `"id`": 11432,
            `"results`": {
                
                `"outcome`": `"passed`"
            }
    }
]

 "
$relDefUrl = "$($tfsBaseUrl)/Training%20projects/_apis/testplan/Plans/70152/Suites/70154/TestPoint?api-version=6.1-preview.2"
try {
    $output = Invoke-RestMethod -Uri $relDefUrl -Method Patch -Body $body -ContentType "application/json" -Headers $header

}
catch{
    Write-Host "StatusCode:" $_.Exception.Response.StatusCode.value__ 
    Write-Host "StatusDescription:" $_.Exception.Response.StatusDescription

}
