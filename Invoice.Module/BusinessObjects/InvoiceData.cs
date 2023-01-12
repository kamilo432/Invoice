using DevExpress.Persistent.Base;
using DevExpress.Persistent.BaseImpl;
using DevExpress.Xpo;

namespace Invoice.Module.BusinessObjects
{
    [NavigationItem("Invoice Data")]
    public class InvoiceData : BaseObject
    {
        public InvoiceData(Session session) : base(session)
        {
        }

        string symbol;
        public string Symbol
        {
            get { return symbol; }
            set { SetPropertyValue(nameof(Symbol), ref symbol, value); }
        }

        string vatNumber;
        public string VatNumber
        {
            get { return vatNumber; }
            set { SetPropertyValue(nameof(VatNumber), ref vatNumber, value); }
        }

        string customerName;
        public string CustomerName
        {
            get { return customerName; }
            set { SetPropertyValue(nameof(CustomerName), ref customerName, value); }
        }

        string street;
        public string Street
        {
            get { return street; }
            set { SetPropertyValue(nameof(Street), ref street, value); }
        }

        string city;
        public string City
        {
            get { return city; }
            set { SetPropertyValue(nameof(City), ref city, value); }
        }

        string postalCode;
        public string PostalCode
        {
            get { return postalCode; }
            set { SetPropertyValue(nameof(PostalCode), ref postalCode, value); }
        }

        private Department department;
        public Department Department
        {
            get { return department; }
            set { SetPropertyValue(nameof(Department), ref department, value); }
        }

        private Manager fullName;
        public Manager Boss
        {
            get { return fullName;  }
            set { SetPropertyValue(nameof(Boss), ref fullName, value); }
        }

        string numberInRegisterOfRecords;
        public string NumberInRegisterOfRecords
        {
            get { return numberInRegisterOfRecords; }
            set { SetPropertyValue(nameof(NumberInRegisterOfRecords), ref numberInRegisterOfRecords, value); }
        }

        private DateTime dateOfCreation;
        public DateTime DateOfCreation
        {
            get { return dateOfCreation; }
            set { SetPropertyValue(nameof(DateOfCreation), ref dateOfCreation, value); }
        }

        private DateTime dateOfCommencementBusiness;
        public DateTime DateOfCommencementBusiness
        {
            get { return dateOfCommencementBusiness; }
            set { SetPropertyValue(nameof(DateOfCommencementBusiness), ref dateOfCommencementBusiness, value); }
        }

        private DateTime dateOfEntryToRegon;
        public DateTime DateOfEntryToRegon
        {
            get { return dateOfEntryToRegon; }
            set { SetPropertyValue(nameof(DateOfEntryToRegon), ref dateOfEntryToRegon, value); }
        }

        private DateTime dateOfEntryToRegisterOfRecords;
        public DateTime DateOfEntryToRegisterOfRecords
        {
            get { return dateOfEntryToRegisterOfRecords; }
            set { SetPropertyValue(nameof(DateOfEntryToRegisterOfRecords), ref dateOfEntryToRegisterOfRecords, value); }
        }

        private DateTime dateOfChangeOccurrence;
        public DateTime DateOfChangeOccurrence
        {
            get { return dateOfChangeOccurrence; }
            set { SetPropertyValue(nameof(DateOfChangeOccurrence), ref dateOfChangeOccurrence, value); }
        }
    }

    [NavigationItem("Invoice Data")]
    [DefaultClassOptions]
    [System.ComponentModel.DefaultProperty(nameof(Title))]
    public class Department : BaseObject
    {
        public Department(Session session) : base(session) { }
        private string title;
        public string Title
        {
            get { return title; }
            set { SetPropertyValue(nameof(Title), ref title, value); }
        }
        private string office;
        public string Office
        {
            get { return office; }
            set { SetPropertyValue(nameof(Office), ref office, value); }
        }
    }

    [NavigationItem("Invoice Data")]
    [DefaultClassOptions]
    [System.ComponentModel.DefaultProperty(nameof(FullName))]
    public class Manager : BaseObject
    {
        public Manager(Session session) : base(session) { }

        private string name;
        public string Name
        {
            get { return name; }
            set { SetPropertyValue(nameof(Name), ref name, value); }
        }

        private string surname;
        public string Surname
        {
            get { return surname; }
            set { SetPropertyValue(nameof(Surname), ref surname, value); }
        }

        private InvoiceData _company;
        public InvoiceData Company
        {
            get { return _company; }
            set { SetPropertyValue(nameof(Company), ref _company, value); }
        }

        private string fullName;
        public string FullName
        {
            get
            {
                string namePart = string.Format("{0} {1}", name, surname);
                return namePart;
            }
        }
    }
}
