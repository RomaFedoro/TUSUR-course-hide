(function () {
    "use strict";
    window.divs = [];
    window.divsInOrderCourseId = [];
    window.toDelete = [];

    init();
    document.addEventListener("DOMContentLoaded", app);
})();

function init() {
    const item = localStorage.getItem("course");
    window.toDelete = item == null ? [] : JSON.parse(item);
}

function app() {
    window.divsParent = document.querySelector(".courses");
    const coursesList = window.divsParent.querySelectorAll(".coursebox");
    console.log(coursesList);
    for (let node of coursesList) {
        // Store in order
        window.divsInOrderCourseId.push(node.dataset.courseid);

        // Buttons
        // console.log(window.toDelete);
        addButton(node, window.toDelete);

        // Rearange & Add Style
        node.classList.remove("odd", "even", "first");
        if (window.toDelete.includes(node.dataset.courseid)) {
            node.classList.add("ch_hidden_course");
            window.divs.push(node);
            window.divsParent.appendChild(node);
        }
    }
}

function updateToDelete(entries) {
    window.toDelete = entries;
    localStorage.setItem("course", JSON.stringify(entries));
}

function addButton(node, toDeleteHere) {
    var btn = document.createElement("button");
    var btndiv = document.createElement("div");

    btn.name = node.dataset.courseid;
    btn.classList.add("ch_btn");
    btndiv.classList.add("ch_btn_div");

    if (toDeleteHere.includes(node.dataset.courseid)) {
        btn.classList.add("ch_btn_deleted");
        btn.type = "deleted";
        btn.onclick = function () {
            deleteEntry(this);
        };
    } else {
        btn.classList.add("ch_btn_allowed");
        btn.type = "allowed";
        btn.onclick = function () {
            addEntry(this);
        };
    }

    node.appendChild(btndiv);
    btndiv.appendChild(btn);
}

function deleteEntry(btn) {
    var courseid = btn.name;

    // delete from list toDelete
    var arr = window.toDelete;
    var ind = arr.indexOf(courseid);
    if (ind == -1) return;
    arr.splice(ind, 1);
    updateToDelete(arr);

    // reorg
    var coursediv = findCourseDiv(courseid);
    coursediv.classList.remove("ch_hidden_course");

    // add new button
    btn.remove();
    addButton(coursediv, window.toDelete);
}

function addEntry(btn) {
    var courseid = btn.name;

    // add to toDelete
    var arr = window.toDelete;
    if (arr.indexOf(courseid) == -1) arr.push(courseid);
    updateToDelete(arr);

    // reorg
    var coursediv = findCourseDiv(courseid);
    coursediv.classList.add("ch_hidden_course");

    // add new button
    btn.remove();
    addButton(coursediv, window.toDelete);
}

function findCourseDiv(courseid) {
    for (var i = 0; i < divs.length; i++) {
        if (window.divs[i].dataset.courseid == courseid) return window.divs[i];
    }
    return null;
}

function findClosestAllowedNeighboor(courseid) {
    for (
        var i = divsInOrderCourseId.indexOf(courseid) + 1;
        i < divsInOrderCourseId.length;
        i++
    ) {
        if (!toDelete.includes(divsInOrderCourseId[i]))
            return findCourseDiv(divsInOrderCourseId[i]);
    }
    return null;
}

function findClosestDisallowedNeighboor(courseid) {
    for (
        var i = divsInOrderCourseId.indexOf(courseid) + 1;
        i < divsInOrderCourseId.length;
        i++
    ) {
        if (toDelete.includes(divsInOrderCourseId[i]))
            return findCourseDiv(divsInOrderCourseId[i]);
    }
    return null;
}
