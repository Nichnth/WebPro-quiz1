const route = (event) => {
  // Check if the event is defined and prevent default behavior
  if (event) {
    event.preventDefault();
  }

  // Get the href attribute from the clicked link
  const href = event?.target?.href;

  // Use history API to change the URL without refreshing the page
  if (href) {
    window.history.pushState({}, "", href);
  }

  // Call handleLocation to update the content based on the new URL
  handleLocation();
};

const routes = {
  "/" : "/pages/home.html",
  "/hometown" : "/pages/hometown.html",
  "/profile" : "/pages/profile.html",
  "/tourist" : "/pages/tourist.html",
  "/food": "/pages/food.html",
  "404": "/pages/404.html"
};

const handleLocation = async () => {
  const path = window.location.pathname;

  // Fetch and display the page based on the current path or show 404
  const route = routes[path] || routes["404"];
  const html = await fetch(route).then((data) => data.text());
  document.getElementById("main-page").innerHTML = html;
};

// Trigger handleLocation when the back/forward buttons are used
window.onpopstate = handleLocation;

// Attach the route function globally for link clicks
window.route = route;

// Load the current location on page load
handleLocation();
