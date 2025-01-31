## Questions and comments

During testing, the expected application behavior was not entirely clear, so I made some assumptions, which I have described below. Additionally, there are some questions that I would discuss and clarify with the product team, engineers, etc in the real project:

1. Behavior after page refresh – If the 'You' row is not present in the table and the user refreshes the page (by clicking the browser’s 'Refresh' button), all rows disappear, leaving only the 'You' row displayed.

2. Error banner – After clicking the browser’s 'Refresh' button, an error banner appears at the left bottom corner of the page. I assume this happens because the app is running in the Dev environment. In a real project, I would reach out to the engineering team to clarify this behavior.

3. Deleting the 'You' row – The behavior of the 'Delete' button is unclear. Should it be disabled, or should it display a warning/error message? In my tests, I assumed that the 'Delete' button should be disabled.

4. Sorting by time – I assumed that rows with the same time should be sorted alphabetically by their time zone name to ensure a deterministic order. This assumption should be clarified with the project manager, UX team, etc.

5. Duplicate labels – The app allows adding rows with the same labels but different time zones.

6. Adding rows with the same time zone – If a user tries to add a row with the same time zone (regardless of the label), the new row is not added, and no warning or error message is displayed.

7. "Local (You)" row – The table should always include the "Local (You)" row by default. However, as a user, I can add another row with the same "Local (You)" label and it can cause the confusion. Probably it should not be allowed.
