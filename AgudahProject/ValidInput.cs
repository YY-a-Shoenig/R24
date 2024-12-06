using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AgudahProject
{
    public class ValidInput
	{
        public int LineNumber { get; set; }
        private string lastName;

		public string LastName
		{
			get { return lastName; }
			set { lastName = value; }
		}
        public string FirstName { get; set; }
        public string Address { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Zip2 { get; set; }
      
       
    }
}
