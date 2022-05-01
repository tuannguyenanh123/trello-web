export const handleSelectAllText = (e) => {
  e.target.focus();
  e.target.select();
  // document.execCommand('selectAll',false,null); can use this case for select all text
};

//onKeyDown
export const saveContentAfterPressEnter = (e) => {
  if (e.key === "Enter") {
    e.target.blur();
  }
};
