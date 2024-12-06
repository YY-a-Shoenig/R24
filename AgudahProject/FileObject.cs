using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace AgudahProject
{
    public class FileObject
    {
        public List<ValidInput> validInputs = new List<ValidInput>();
        public List<InvalidInput> invalidInputs = new List<InvalidInput>();
        public List<Member> members = new List<Member>();

        public string Paths { get; set; }


        private string filePath;

        public string FilePath
        {
            get { return filePath; }
            set { filePath = value; }
        }

        public FileObject(string filePath)
        {
            this.filePath = filePath;
           // ValidInput valid = new ValidInput();
           //InvalidInput invalid = new InvalidInput();
        }
        StringBuilder sbV = new StringBuilder();
        StringBuilder sbIV = new StringBuilder();

        public void ParseFile()
        {
            ValidInput valid = new ValidInput();
            InvalidInput invalid = new InvalidInput();
            bool validation = true;
            bool text = true;
            string line = "";
            FileStream fs = new FileStream(filePath, FileMode.Open, FileAccess.Read);
            StreamReader sr = new StreamReader(fs);
            int vI = 0;
            int iVI = 0;
            string[] piece = new string[7];
            int count = 1;
            int totalRows = 0;
            while (text)
            {
                Debug.WriteLine(count);
                
                
                validation=true;
                line = sr.ReadLine();
                if (line == null) { text= false; break; }
                totalRows++;
                piece =line.Split(',');
               
                members.Add(new Member(piece[0], piece[1], piece[2], piece[3], piece[4],
                    piece[5], piece[6]));
                count++;
                if (members[totalRows-1].Address2== "") validation = true;
                if (members[totalRows-1].FirstName== "") { validation = false; invalid.Missing="FirstName"; }
                if (members[totalRows-1].LastName== "") { validation = false; invalid.Missing="LastName"; }
                if (members[totalRows-1].Address== "") { validation = false; invalid.Missing="Address"; }
                if (members[totalRows-1].City== "") { validation = false; invalid.Missing="City"; }
                if (members[totalRows-1].Zip== "") { validation = false; invalid.Missing="State"; }
                if (members[totalRows-1].Zip== "") { validation = false; invalid.Missing="Zip"; }


                if (validation == true)
                {
                    members[totalRows-1].Valid = true;
                    valid.FirstName=members[totalRows-1].FirstName;
                    valid.LastName=members[totalRows-1].LastName;
                    valid.Address=members[totalRows-1].Address;
                    valid.Address2=members[totalRows-1].Address2;
                    valid.City=members[totalRows-1].City;
                    valid.State=members[totalRows-1].State;
                    valid.Zip=members[totalRows-1].Zip;
                    valid.LineNumber=totalRows;

                    validInputs.Add(valid);
                    sbV.AppendLine(valid.LastName);
                    vI++;
                    

                }
                else if (validation == false)
                {
                    members[totalRows-1].Valid=false;
                    invalid.FirstName=members.ElementAt(totalRows-1).FirstName;
                    invalid.LastName=members.ElementAt(totalRows-1).LastName;
                    invalid.Address=members.ElementAt(totalRows-1).Address;
                    invalid.Address2=members.ElementAt(totalRows-1).Address2;
                    invalid.City=members.ElementAt(totalRows-1).City;
                    invalid.State=members.ElementAt(totalRows-1).State;
                    invalid.Zip=members.ElementAt(totalRows-1).Zip;
                    invalid.LineNumber=totalRows;
                    invalid.LineNumber=totalRows;

                    invalidInputs.Add(invalid);
                    sbIV.AppendLine(invalid.LastName);
                    iVI++;
                    //invalid.SaveData();

                }

            }

            SaveData();
        }
        public void SaveData()
        {
            string curFilePath = "";
            string newFile = "members.txt";
            string fullPath = "";
            FolderBrowserDialog fbd = new FolderBrowserDialog();
            DialogResult result = fbd.ShowDialog();
            if (result == DialogResult.OK)
            {
                curFilePath= fbd.SelectedPath;
                fullPath= Path.Combine(curFilePath, newFile);
            }
            Paths=curFilePath;
            FileStream fs = new FileStream(fullPath, FileMode.OpenOrCreate);
            StreamWriter sw = new StreamWriter(fs);
            int rowNum = 1;
            for (int i = 0; i<members.Count; i++)
            {
                
                if (i==0) { sw.WriteLine("Valid inputs:");
                    sw.WriteLine(); 
                    sw.WriteLine();
                    sw.WriteLine();
                    sw.WriteLine();

                };

                if (members[i].Valid==true) { 
                sw.WriteLine($"line:{rowNum}  "+members[i].Print());
                sw.Flush();
                }
                rowNum++;
                
            }
            int rowNum2 = 1;
            for (int j = 0; j<members.Count; j++)
            {
                
                if (j==0) { sw.WriteLine("Invalid inputs;");
                    sw.WriteLine();
                    sw.WriteLine();
                    sw.WriteLine();
                    sw.WriteLine();
                    sw.WriteLine();
                };
                if (members[j].Valid==false)
                {
                    sw.WriteLine($"line: {rowNum2}  "+members[j].Print());
                    sw.Flush();
                    
                }
                rowNum2++;
            }
            sw.Close();
        }

    }


}

