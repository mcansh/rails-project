/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb
import 'babel-polyfill';
import { $ } from './bling';
import toggleStatus from './toggleStatus';
import deleteList from './deleteList';
import deleteTask from './deleteTask';
import createTask from './createTask';
import updateListName from './updateListName';
import consoleStyles from './log';

console.log('%c Your productivity just increased 9001% 🚀', consoleStyles);

if ($('.task__list')) {
  $('.task__list').on('change', toggleStatus);
  $('.task__list').on('click', deleteTask);
  $('.list__form--destroy').on('click', deleteList);
}

if ($('#edit__button')) {
  $('#edit__button').on('click', updateListName);
}

if ($('#new_task')) {
  $('#new_task').on('submit', createTask);
}
