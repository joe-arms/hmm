let kanna = [
   "Kanna 01",
   "Kanna 02",
   "Kanna 03",
   "Kanna 04",
   "Kanna 05",
   "Kanna 06",
   "Kanna 07",
]

let kannaInfo = {
   "Kanna 01": {
      "name": "KANNA 01",
      "role": "01",
      "birthday": "2021-05-01",
    },
   "Kanna 02": {
      "name": "KANNA 02",
      "role": "02",
      "birthday": "2021-05-01",
   },
   "Kanna 03": {
      "name": "KANNA 03",
      "role": "03",
      "birthday": "2021-05-01",
   },
   "Kanna 04": {
      "name": "KANNA 04",
      "role": "04",
      "birthday": "2021-05-01",
   },
   "Kanna 05": {
      "name": "KANNA 05",
      "role": "05",
      "birthday": "2021-05-01",
   },
   "Kanna 06": {
      "name": "KANNA 06",
      "role": "06",
      "birthday": "2021-05-01",
   },
   "Kanna 07": {
      "name": "KANNA 07",
      "role": "07",
      "birthday": "2021-05-01",
   },
}

function Button(id = "", className = "") {
  let button = document.createElement("button");
  button.id = id;
  button.className = className;
  return button;
}

function Div(id = "", className = "") {
  let div = document.createElement("div");
  div.id = id;
  div.className = className;
  return div;
}

function Text(text = "", className = "", id = "") {
  let p = document.createElement("p");
  p.textContent = text;
  p.className = className;
  p.id = id;
  return p;
}

// https://stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd
function calculateAge(birthday) {
  let birthDate = new Date(birthday);
  let ageDifMs = Date.now() - birthDate.getTime();
  let ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function Info(memberName, infoList = kannaInfo) {
  let memberInfo = infoList[memberName];
  memberInfo["age"] = calculateAge(memberInfo["birthday"]);
  let div = Div(memberName + "Info", "memberInfo");
  div.tabIndex = 0;
  for (let info in memberInfo) {
    let propertyText = info.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1").replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    let valueText = memberInfo[info];
    let propertyClass = "member" + info.replace(/([A-Z]+)/g, "$1").replace(/([A-Z][a-z])/g, "$1").replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    let p = Text(propertyText + ": " + valueText, propertyClass, memberName + info);

    div.appendChild(p);
  }
  return div;
}

function showMember(member) {
  member.style.height = "50vh";
  document.getElementById(member.id + "Label").style.display = "inline";
  document.getElementById(member.id + "Info").style.display = "inline";
  member.collapsed = false;
}

function collapseProfile(member, initHeight = (100 / kanna.length) + "vh") {
  member.style.height = initHeight;
  member.style.filter = "grayscale(100%) brightness(50%)";
  document.getElementById(member.id + "Label").style.display = "none";
  document.getElementById(member.id + "Info").style.display = "none";
  member.collapsed = true;
}

function collapseAllProfiles(profileClassName = "Profile") {
  let profiles = document.getElementsByClassName(profileClassName);
  for (let i = 0; i < profiles.length; i++) {
    collapseProfile(profiles[i]);
  }
}

function collapseAllProfilesExcept(member, members) {
  for (let i = 0; i < members.length; i++) {
    if (members[i].id !== member.id) {
      collapseProfile(members[i]);
    }
  }
}

function toggle(member, members) {
  collapseAllProfilesExcept(member, members);
  if (member.collapsed) {
    showMember(member);
  } else {
    collapseProfile(member);
  }
}

function Profile(memberName = "Kanna 01") {
  let button = Button(memberName, "Profile");
  button.textContent = memberName + " Profile";
  button.collapsed = true;

  // Profile text
  let label = Text(memberName, "memberLabel", memberName + "Label");
  let info = Info(memberName);
  button.appendChild(label);
  button.appendChild(info);

  let bgImage = (fileExtension) => "url('./img/" + fileExtension + "/" + memberName + "." + fileExtension + "')";
  button.style.backgroundImage = bgImage("webp") + ", " + bgImage("png"); // + ", " + bgImage("jpg");

  let openProfile = () => {
    toggle(button, document.body.getElementsByClassName("Profile"));
    setTimeout(() => {
      button.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 100);
  }

  button.addEventListener("click", openProfile);

  return button;
}

function Profiles(memberList = kanna) {
  let div = Div("KANNA", "wrapper");
  for (let i = 0; i < memberList.length; i++) {
    let member = Profile(memberList[i]);
    member.style.animation = "intro " + Math.log(i + 2) + "s";
    div.appendChild(member);
  }
  return div;
}
