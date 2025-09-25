import React from "react";
import Card from "@/components/atoms/Card";
import StatusIndicator from "@/components/molecules/StatusIndicator";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const ContactList = ({ contacts, onEdit, onDelete, onView }) => {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Company</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Phone</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Created</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contacts.map((contact) => (
              <tr key={contact.Id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-700">
                        {contact.firstName[0]}{contact.lastName[0]}
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">
                        {contact.firstName} {contact.lastName}
                      </p>
                      <p className="text-sm text-gray-600">{contact.position}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-900">{contact.company}</td>
                <td className="py-4 px-4 text-gray-600">{contact.email}</td>
                <td className="py-4 px-4 text-gray-600">{contact.phone}</td>
                <td className="py-4 px-4">
                  <StatusIndicator status={contact.status} type="contact" />
                </td>
                <td className="py-4 px-4 text-gray-600">
                  {format(new Date(contact.createdAt), "MMM d, yyyy")}
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(contact)}
                    >
                      <ApperIcon name="Eye" className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(contact)}
                    >
                      <ApperIcon name="Edit" className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(contact)}
                      className="text-error-600 hover:text-error-700 hover:bg-error-50"
                    >
                      <ApperIcon name="Trash2" className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ContactList;