let j = 1;

let arrHead = new Array(); // array for header.
arrHead = ["Semester", "Number of Credits", "SGPA", ""];

function createTable() {
  let empTable = document.createElement("table");
  empTable.setAttribute("id", "empTable"); // table id.
  empTable.setAttribute(
    "class",
    "table table-striped mt-4 table-bordered table-sm",
  ); // table class.

  let tr = empTable.insertRow(-1);
  for (let h = 0; h < arrHead.length; h++) {
    let th = document.createElement("th"); // create table headers
    th.innerHTML = arrHead[h];
    tr.appendChild(th);
  }

  let div = document.getElementById("cont");
  div.appendChild(empTable); // add the TABLE to the container.
}

// now, add a new to the TABLE.
function addRow() {
  let empTab = document.getElementById("empTable");

  let rowCnt = empTab.rows.length; // table row count.
  let tr = empTab.insertRow(rowCnt); // the table row.
  tr = empTab.insertRow(rowCnt);

  for (let c = 0; c < arrHead.length; c++) {
    let td = document.createElement("td"); // table definition.
    td = tr.insertCell(c);

    if (c == arrHead.length - 1) {
      // the first column.
      // add a button in every new row in the first column.
      let button = document.createElement("input");

      // set input attributes.
      button.setAttribute("type", "button");
      button.setAttribute("class", "btn btn-danger");
      button.setAttribute("value", "X");

      // add button's 'onclick' event.
      button.setAttribute("onclick", "removeRow(this)");

      td.appendChild(button);
    } else if (c == 0) {
      let valSem = String(j);
      let ele = document.createElement("input");
      ele.setAttribute("type", "button");
      ele.setAttribute("class", "btn btn-primary");
      ele.setAttribute("value", valSem);
      td.appendChild(ele);
    } else {
      // 2nd, 3rd  will have textbox.
      let ele = document.createElement("input");
      ele.setAttribute("type", "number");
      ele.setAttribute("class", "btn btn-success btn-block");
      // ele.setAttribute("min", "0");
      // ele.setAttribute("max", "100");
      if (c == 1) {
        ele.setAttribute("id", "cg-noc" + String(j));
      } else {
        ele.setAttribute("id", "cg-sg" + String(j));
      }
      ele.setAttribute("value", "");
      ele.setAttribute("style", "max-width:200px");
      td.appendChild(ele);
    }
  }
  j++;
}

// delete TABLE row function.
function removeRow(oButton) {
  let empTab = document.getElementById("empTable");
  empTab.deleteRow(oButton.parentNode.parentNode.rowIndex); // button -> td -> tr.
  j--;
}

function getCgpa() {
  let run1 = true;
  let run2 = true;
  let run;
  let msg = "";
  document.getElementById("cgpa-error").style.display = "none";
  document.getElementById("cgpa-results").style.display = "none";
  let empTab = document.getElementById("empTable");
  const rowCnt = empTab.rows.length; // table row count.
  let totCred = 0;
  let tot = 0;
  for (let k = 1; k < j; k++) {
    let cred = document.getElementById("cg-noc" + String(k)).value;
    let sgpa = document.getElementById("cg-sg" + String(k)).value;

    // CGPA Validations
    if (cred < 0 || cred === "") {
      run1 = false;
      msg += "Credits must be a Positive Interger <br>";
      document.getElementById("cg-noc" + String(k)).value = "";
    } else if (!Number.isInteger(Number(cred))) {
      run1 = false;
      msg += "Credits must be a Positive Integer <br>";
      document.getElementById("cg-noc" + String(k)).value = "";
    }

    // SGPA Validations
    if (sgpa < 0 || sgpa > 10) {
      run2 = false;
      msg += "SGPA must be in 0 and 10";
      document.getElementById("cg-sg" + String(k)).value = "";
    } else if (sgpa === "") {
      run2 = false;
      msg += "SGPA cant be empty";
    }
    run = run1 && run2;
    // console.log(msg);
    if (!run) {
      document.getElementById("cgpa-error").style.display = "block";
      document.getElementById("cg-error-message").innerHTML = msg;
    }

    // Calculating CGPA Here
    totCred += Number(cred);
    tot += Number(cred) * Number(sgpa);
  }
  //   console.log(totCred);
  //   console.log(tot);
  let myCGPA = tot / totCred;
  let cgpaResults = document.getElementById("cgpa-results");

  document.getElementById("cg-totcreds").innerHTML = totCred;
  document.getElementById("cg-totcgpa").innerHTML = myCGPA;
  let cgProgressbar = document.getElementById("cg-progress-bar");
  cgProgressbar.style.width = String(myCGPA.toFixed(2) * 10) + "%";
  if (myCGPA < 6.5) {
    cgProgressbar.setAttribute("class", "progress-bar bg-danger");
  } else if (myCGPA < 7) {
    cgProgressbar.setAttribute("class", "progress-bar bg-warning");
  } else if (myCGPA < 8) {
    cgProgressbar.setAttribute("class", "progress-bar  bg-primary");
  } else if (myCGPA < 9) {
    cgProgressbar.setAttribute("class", "progress-bar bg-success");
  } else {
    cgProgressbar.setAttribute(
      "class",
      "progress-bar progress-bar-striped progress-bar-animated bg-success",
    );
  }
  cgProgressbar.innerHTML = myCGPA.toFixed(2);
  if (run) {
    cgpaResults.style.display = "block";
  } else {
    cgpaResults.style.display = "none";
  }
}