// Listen for form submit
document.getElementById('myForm').addEventListener('submit',saveBookmark)
// Save Bookmark
function saveBookmark(e){
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    
    if(!validateForm(siteName,siteUrl))
    {
        return false;
    }

    var bookmark = {
        name : siteName,
        url : siteUrl
    }

    // Local Storage working
    // localStorage.setItem('test','Hello World');
    // console.log(localStorage.getItem('test'));
    // localStorage.removeItem('test');
    // console.log(localStorage.getItem('test'));

    // Test if bookmark is null
    if(localStorage.getItem('bookmarks') === null){
        // Init array
        var bookmarks = [];
        // Add to array
        bookmarks.push(bookmark);
        // Set To loaclStorage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    // else if bookmarks is present in localStorage
    else{
        // Get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Set to localStorage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    // Clear the form
    document.getElementById('myForm').reset();
    // Re-fetch Bookmarks
    fetchBookmarks();
    // Prevent form from submitting
    e.preventDefault();
}
function deleteBookmark(url)
{
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop Through Bookmarks
    for(var i = 0 ;i < bookmarks.length; i++){
        if(bookmarks[i].url == url)
        {
            bookmarks.splice(i,1);
        }
    }
    // Re-Set to localStorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    //Re-fetch Bookmarks
    fetchBookmarks();
}


// Fetch Bookmarks
function fetchBookmarks(){
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');
    
    // Build Output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well" style="color:black;">'+
                                       '<h3>'+name.toUpperCase()+
                                       ' <a class="btn btn-info" target="_blank" href="'+url+'">Visit</a>' + 
                                       ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' + 
                                       '</h3>'+
                                       '</div>';
    }

}

function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl)
    {
        alert('Please fill in the form');
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!siteUrl.match(regex))
    {
        alert('Please use a valid URL');
        return false;
    }
    return true;
}
