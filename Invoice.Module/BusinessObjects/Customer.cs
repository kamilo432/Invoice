using DevExpress.Persistent.BaseImpl;
using DevExpress.Persistent.Base;
using DevExpress.Xpo;
using System.Collections.ObjectModel;
using System.ComponentModel;

namespace Invoice.Module.BusinessObjects
{
    [DefaultProperty(nameof(InvoiceData))]
    [DefaultClassOptions]
    [NavigationItem("Customer")]
    public class Customer : BaseObject
    {
        public Customer(Session session) : base(session)
        {

        }

        string email;
        public string Email
        {
            get { return email; }
            set { SetPropertyValue(nameof(Email), ref email, value); }
        }

        string phoneNumber;
        public string PhoneNumber
        {
            get { return phoneNumber; }
            set { SetPropertyValue(nameof(PhoneNumber), ref phoneNumber, value); }
        }

        private InvoiceData _invoiceData;
        public InvoiceData InvoiceData
        {
            get { return _invoiceData; }
            set { SetPropertyValue(nameof(InvoiceData), ref _invoiceData, value); }
        }

        private Manager manager;
        public Manager Manager
        {
            get { return manager; }
            set { SetPropertyValue(nameof(Manager), ref manager, value); }
        }

        public virtual IList<InvoiceData> DataOfInvoice { get; set; } = new ObservableCollection<InvoiceData>();
        public virtual IList<Manager> Managers { get; set; } = new ObservableCollection<Manager>();
        public virtual IList<Department> Segments { get; set; } = new ObservableCollection<Department>();
    }
}