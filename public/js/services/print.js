function PrintElem(elem)
{
    var mywindow = window.open();

   
    mywindow.document.write(document.getElementById(elem).innerHTML);

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
}