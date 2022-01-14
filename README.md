# react-hook
The CustomerDirectory component (scroll down to find) currently renders a list of 6 customer addresses, each with an "Edit" button that does nothing.
1.	Please add behavior to allow the "Edit" button to open a modal that will allow the user to edit each of the following customer parameters: first_name, last_name, address, address2, city, state, and zip_code.
2.	The modal should render an input field for each of these parameters, an exit button to close the modal, and a submit button that will save the new details and display them to the user in the CustomerDirectory component in place of the old address.
3.	All fields, except for address2, should be required.
4.	If the user hits the exit button, none of the customer address details should be altered in the CustomerDirectory component.
This implementation requires no backend, and can be achieved without the Context API or Redux. On page refresh, all data will be reset back to the initial values, which is to be expected when not saving updated details anywhere besides JS. Please use React hooks, such as useState(), to accomplish this goal. You do not need to import any packages to achieve this goal, but if you wish to, you may. You will be evaluated upon how well you implement common development standards and how efficiently and robustly you've achieved your goal.
Bonus points:
●	Save updated customer data to localStorage so that it retains the updated values on page refresh.
●	Add the ability to delete a customer
●	Add the ability to create a new customer
●	The current styling is very basic. Make everything prettier.
●	Use a dropdown menu to update the "state" value that allows the user to select a full state name, such as "California", while setting the React state to the ISO state value counterpart, such as "CA".
●	Add the ability to edit the "Country" value to be another country besides "US". Additional bonus points if you can get the "State" dropdown to change depending upon which country is selected. Populating the "state" dropdown for even just a few countries would be impressive. Not all countries need to be supported.
