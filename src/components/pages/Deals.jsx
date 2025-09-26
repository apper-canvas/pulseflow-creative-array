import React, { useState, useEffect } from "react";
import Header from "@/components/organisms/Header";
import DealPipeline from "@/components/organisms/DealPipeline";
import DealForm from "@/components/organisms/DealForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { dealService } from "@/services/api/dealService";
import { contactService } from "@/services/api/contactService";
import { companyService } from "@/services/api/companyService";
import { salesRepService } from "@/services/api/salesRepService";
import { toast } from "react-toastify";

const Deals = () => {
  const [deals, setDeals] = useState([]);
const [contacts, setContacts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [salesReps, setSalesReps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);

const loadData = async () => {
    try {
      setError("");
      setLoading(true);
      const [dealsData, contactsData, companiesData, salesRepsData] = await Promise.all([
        dealService.getAll(),
        contactService.getAll(),
        companyService.getAll(),
        salesRepService.getAll()
      ]);
      setDeals(dealsData);
      setContacts(contactsData);
      setCompanies(companiesData);
      setSalesReps(salesRepsData);
    } catch (err) {
      setError("Failed to load deals data");
      console.error("Deals loading error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddDeal = () => {
    setEditingDeal(null);
    setShowForm(true);
  };

  const handleDealClick = (deal) => {
    setEditingDeal(deal);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingDeal) {
        const updated = await dealService.update(editingDeal.Id, formData);
        setDeals(prev => prev.map(d => d.Id === editingDeal.Id ? updated : d));
        toast.success("Deal updated successfully");
      } else {
        const newDeal = await dealService.create(formData);
        setDeals(prev => [...prev, newDeal]);
        toast.success("Deal created successfully");
      }
      setShowForm(false);
      setEditingDeal(null);
    } catch (err) {
      toast.error("Failed to save deal");
      console.error("Save error:", err);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingDeal(null);
  };

  if (showForm) {
return (
      <DealForm
        deal={editingDeal}
        contacts={contacts}
companies={companies}
        salesReps={salesReps}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
        isEditing={!!editingDeal}
      />
    );
  }

  if (loading) return <Loading type="cards" />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="space-y-6">
      <Header
        title="Deals Pipeline"
        onAddClick={handleAddDeal}
        addLabel="Add Deal"
        showSearch={false}
      />

      {deals.length === 0 ? (
        <Empty
          title="No deals found"
          message="Start building your sales pipeline by adding your first deal."
          actionLabel="Add Deal"
          onAction={handleAddDeal}
          icon="Target"
        />
      ) : (
        <DealPipeline
          deals={deals}
          onDealClick={handleDealClick}
        />
      )}
    </div>
  );
};

export default Deals;