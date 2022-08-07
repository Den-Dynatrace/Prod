# Production Repository for Azure hosted SME Tracker
[Actual tool](smetracker.dynatrace.com)

## Purpose:

The SME tracker offers a resource for Product Specialist Managers, and Employees to track and log completed SME activities.
Activities are monitored to determine raise opportunities and organized in tool categorically.  
Tracker Tool populates manager direct reports from Microsoft’s active directory, mirroring company internal organization 
Individual employees can view current profile, add new Documents, and Delete Documents 
Managers, for their direct reports, can view profiles, add documents and remove documents. 
Additionally managers can delete employees or managers from the tools database.
## Employee Work Flow:
Employee users after completing an SME activity can log in using AD (there are two requests, one for id the second for Microsoft’s Graph API token).  After completing prompts select profile to view current activity pool.  From here users can select too add a new document or remove a document. A log button can be found either back on the main splash or at the bottom of the profile view page.

## Manager Work Flow:
Managers will utilize the same login button and complete the same two series of SSO.  Then move to a manager dashboard.  Manager from here can select one of their direct reports profiles to interact with.  Then can select view profile, add doc, or remove doc.  In addition to direct report interactions managers can add or remove entire employee profiles from the tool if needed. 

#Credidation:
This tool was developed the summer of 2022 as an intern focused activity.  Two Denver Dynatrace interns undertook creating this resource.  Erik Sundblad, and Chris Nodine are the original architects (2022)!
Much Thanks to Simon Bauer, Clyde Anderson, and Ryan Diehl for oversite guidance and good sense! 
### Details of further development and current architecture can be found at: 
[Dev](http://github.com/Den-Dynatrace/Dev] Repository
