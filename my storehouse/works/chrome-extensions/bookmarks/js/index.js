console.log(chrome.bookmarks);

chrome.bookmarks.create({
    parentId: '1',
    index: 0,
    title: 'Google',
    url: 'http://www.google.com/'
}, function(bookmark){
    console.log(bookmark);
});
