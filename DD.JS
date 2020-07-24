﻿loadItems().then((items) => {
  listMenu(items);
});

function listMenu(items) {
  wrapList.innerHTML = items.map((item) => show(item));
}
