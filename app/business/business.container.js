import userManager from './user.manager';
import studentManager from './student.manager';
import applicationManager from './application.manager';
import attachmentManager from './attachment.manager';
import detailsManager from './details.manager';


function getContext(request) {
  return { user: request && request.user };
}

function getter(manager) {
  return (request) => manager.create(getContext(request));
}

export default {
  getUserManager: getter(userManager),
  getStudentManager: getter(studentManager),
  getApplicationManager: getter(applicationManager),
  getAttachmentManager: getter(attachmentManager),
  getDetailsManager: getter(detailsManager)
};
