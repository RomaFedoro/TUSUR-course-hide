(function () {
    "use strict";
    window.divs = [];
    window.divsInOrderCourseId = [];
    window.toDelete = getHiddenCourses();
    console.log(toDelete);
    const coursList = [];
    const hiddenCourses = getHiddenCourses();
    document.addEventListener("DOMContentLoaded", app);
})();

function getHiddenCourses() {
    const item = localStorage.getItem("course");
    return item === null ? [] : JSON.parse(item);
}

function app() {
    const coursesNode = document.querySelector(".courses");
    const coursesList = coursesNode.querySelectorAll(".coursebox");

    for (let node of coursesList) {
        const courseId = node.dataset.courseid;
        // Store in order
        divsInOrderCourseId.push(courseId);

        addHideCheckbox(node, toDelete);

        // Rearange & Add Style
        node.classList.remove("odd", "even", "first");
        if (toDelete.includes(courseId)) {
            node.classList.add("ch_hidden_course");
            divs.push(node);
            coursesNode.appendChild(node);
        }
    }
}

const getCourseNode = (courseId) =>
    document.querySelector(`.coursebox[data-courseid="${courseId}"]`);

function updateLocalStorage(entries) {
    toDelete = entries;
    localStorage.setItem("course", JSON.stringify(entries));
}

function addHideCheckbox(node, hiddenCourses) {
    const courseId = node.dataset.courseid;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = courseId;
    checkbox.checked = hiddenCourses.includes(courseId);

    checkbox.addEventListener("input", function () {
        if (this.checked) {
            hideСourse(courseId, hiddenCourses);
            node.classList.add("ch_hidden_course");
        } else {
            showСourse(courseId, hiddenCourses);
            node.classList.remove("ch_hidden_course");
        }
    });

    node.appendChild(checkbox);
}

function showСourse(courseId, hiddenCourses) {
    // delete from list toDelete
    const updatedHiddenCourses = hiddenCourses.filter((el) => el !== courseId);
    updateLocalStorage(updatedHiddenCourses);
}

function hideСourse(courseId, hiddenCourses) {
    // add to toDelete
    hiddenCourses.push(courseId);
    updateLocalStorage(hiddenCourses);
}
