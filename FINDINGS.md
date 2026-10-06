## FINDINGS

**Verdict**: For failed tests, verdict is either **"my test is wrong"**** or **"the application has a bug"**  

### Failed Tests:
**Failed Test 01**: - Searching by a company name narrows the list  
**Scope**: search.spec.ts   
**Prediction**: when searching by a company name, it should narrow the leads rows.  
**Actual Output**:  returned "No leads found"
**Verdict**: The application has a bug  
**Reason**: when searching for "HimalKart" company, it should have narrowed down the leads list and give me 1 leads row. Instead, it returned 0 leads row.  
**Trace viewer output**: @search.spec.ts:37,  
Error: expect(locator).toHaveCount(expected) failed  
**Surprise**: searching by company name doesn't narrow the leads list unlike searching by lead's first name or last name   

**Failed Test 02**: - - The count text reflects how many leads are shown after a search.  
**Scope**: search.spec.ts  
**Prediction**: The count text shows the correct number of leads rows after the search.  
**Actual Output**:  "Showing 12 of 12 leads"  
**Verdict**: The application has a bug  
**Reason**: when searching for "Gita Rai", it narrows down the leads list and returns 1 row. But, the count text still displays *'showing 12 of 12 leads'*. i.e. the count element uses hardcoded string.   
**Trace viewer output**: @search.spec.ts:60,  
Error: expect(locator).toHaveText(expected) failed  
**Surprise**: the count text doesn't update. 

**Failed Test 03**: - Adding a lead with a chosen status saves that lead with that status.
**Scope**: add-leads.spec.ts   
**Prediction**: adding a lead with a chosen status saves the lead with same status 
**Actual Output**: while the lead details are saved and appear on the list, every status gets the same 'New' status
**Verdict**: The application has a bug  
**Reason**: my code checks for the exact status that was selected when adding a lead. But, the application doesn't use that status. It uses 'New' for all leads added later.
**Trace viewer output**: @add-leads.spec.ts:59
Error: expect(locator).toHaveText(expected) failed
**Surprise**: the status doesn't update according to the chosen status while adding a lead   



