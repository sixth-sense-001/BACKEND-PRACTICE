Things to continue on on 31/08/2026
- On the paginationMiddleware:
. You first see if the starting index is greater than the length of the array, if so the page is blank.
. Else if the end Index+1 is greater than the length of the array, you make a forloop from the startIndex to the end of the array
.Else you print till you reach endIndex
.Also check for negative pages or limits and handle them
. If the startIndex is greater 