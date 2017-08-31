# Giftastic
Use the GIPHY API to make a dynamic web page that populates with gifs of the user's choice. 

### User Interface

Categories for gifs are displayed in the sidebar. The user can add more categories of their choice using the text input and Add a Character button. They can also select a rating and pass it as a parameter to the API to filter
results by specified rating.
By adding a rating, the results will include that rating and everything below it. So PG-13 will include PG, G, and Y gifs as well.
Clicking a particular category button initiates an AJAX call to the GIPHY API and the page grabs 10 static, non-animated gif images from the GIPHY API and displays them on the right pane.
Clicking on the image toggles pausing and playing the gifs.