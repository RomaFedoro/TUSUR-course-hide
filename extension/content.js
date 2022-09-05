"use strict";
const coursesList = [];
let hiddenCourses = getHiddenCourses();

function getHiddenCourses() {
    const item = localStorage.getItem("course");
    return item === null ? [] : JSON.parse(item);
}

function app() {
    const coursesNode = document.querySelector(".courses");
    const courseNodeList = coursesNode.querySelectorAll(".coursebox");

    for (let course of courseNodeList) {
        const courseId = course.dataset.courseid;
        coursesList.push(courseId);

        addHideCheckbox(course, hiddenCourses);

        // Rearange & Add Style
        course.classList.remove("odd", "even", "first");
        if (hiddenCourses.includes(courseId)) {
            course.classList.add("ch_hidden_course");
            coursesNode.appendChild(course);
        }
    }
}

const getCourseNode = (courseId) =>
    document.querySelector(`.coursebox[data-courseid="${courseId}"]`);

const updateLocalStorage = (entries) =>
    localStorage.setItem("course", JSON.stringify(entries));

function addHideCheckbox(node) {
    const courseId = node.dataset.courseid;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = courseId;
    checkbox.checked = hiddenCourses.includes(courseId);

    checkbox.addEventListener("input", function () {
        let updatedHiddenCourses;

        if (this.checked) {
            updatedHiddenCourses = [...hiddenCourses, courseId];
            node.classList.add("ch_hidden_course");
        } else {
            updatedHiddenCourses = hiddenCourses.filter(
                (el) => el !== courseId
            );
            node.classList.remove("ch_hidden_course");
        }

        updateLocalStorage(updatedHiddenCourses);
        hiddenCourses = updatedHiddenCourses;
    });

    node.appendChild(checkbox);
}

document.addEventListener("DOMContentLoaded", app);
