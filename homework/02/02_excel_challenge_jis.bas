Attribute VB_Name = "Module3"
Sub jis_workbook_loops()
    
    'Send loop through all worksheets: testing for different market years'
    
    Dim ws As Worksheet
    Dim first_ws As Worksheet
    Set first_ws = ActiveSheet
    
    For Each ws In ThisWorkbook.Worksheets
        ws.Activate
    
    'Assign headers for deposit columns'
    
    Range("I1").value = "Ticker"
    Range("J1").value = "Yearly Change"
    Range("K1").value = "Percent Change"
    Range("L1").value = "Total Stock Volume"
    
    'Declare variables'
    
    'Declare counter to loop through each stock, picking up variables to calculate'
    Dim i As Long
    
    'Declare counter to loop to new stock, resetting variables'
    Dim d As Long
    
    'Declare counter to count number of active rows'
    Dim row As Long
    
    'Declare volume; long variable generates error, changed to double;
    Dim vol As Double
    
    'Declare first row for a stock'
    Dim stock_first_row As Long
    
    'Declare last row for a stock'
    Dim stock_last_row As Long
    
    'Declare opening price for a stock'
    Dim price_open As Double
    
    'Declare closing price for a stock'
    Dim price_close As Double
    
    'Declare change in price for a stock'
    Dim price_diff As Double
    
    
    'Assign variables'
    
    stock_first_row = 2
    stock_last_row = stock_first_row + 1 'stock_last_row = stock_first_row + 263 'need to DYNAMICALLY generate last row #'
    row = Cells(Rows.Count, 1).End(xlUp).row
    i = stock_first_row
    d = stock_first_row
    price_open = Cells(stock_first_row, 3)
    
    'Remove double formatting for volume values'
    Columns("L").NumberFormat = "0"
    
        
    'Assign volume variable with initial value'
    
    vol = Cells(stock_first_row, 7).value
    'MsgBox (vol)
       
    'Some kind of for Loop here that progresses by ticker or creates a range'
    
    'If the stock tickers are the same...'
     
     For i = stock_first_row To row
     
        If Cells(i, 1).value = Cells(i + 1, 1).value Then
            
            'Then assign stock_last_row'
            
            stock_last_row = i + 1
            
            'Then and add new date's volume value to volume variable'
            
            vol = vol + Cells(i + 1, 7).value
        
                                                    
    'If the stock tickers are not the same...'
                
        Else
                
            'Insert ticker value to ticker column'
            
            Cells(d, 9).value = Cells(i, 1).value 'd is the deposit row'

            
            'Define price_close'
            
            price_close = Cells(i, 6).value
                                   
            'Calculate and insert price difference to price column'
            
            price_diff = price_close - price_open
            
            Cells(d, 10).value = price_diff
            
            'Format cell to green for positive difference, red for negative'
            
                For stock_last_row = stock_last_row To (stock_last_row + 1)
                    
                    If price_diff > 0 Then
                        Cells(d, 10).Interior.ColorIndex = 4
                    
                    Else
                        Cells(d, 10).Interior.ColorIndex = 3
                    
                    End If
                
                Next stock_last_row
            
            'Calculate price_diff in percentage
            
                'If price_close is 0...'
                        
                If price_close = 0 And vol = 0 Then
                
                    'Then can't divide by 0 when calculating difference'
                    
                    Cells(d, 10).value = 0
                    
                    Cells(d, 11).value = 0
                    
                Else
                    
                    Cells(d, 11).value = (price_close - price_open) / price_close
                    
                    End If
            
            'Format price_diff percentage as percentage
            
            Cells(d, 11).NumberFormat = "0.00%"
            
            'Insert volume value to value column'
            
            Cells(d, 12).value = vol
            
            'Shift deposit row down for next stock'
            
            d = d + 1
            
            'Set stock_first_row to new stock'
            
            stock_first_row = i + 1
            
            
            'Set stock_last_row to new stock'
            
            stock_last_row = i + 262
                
            
            'Reset volume'
            
            vol = 0 'Cells(stock_first_row, 7).value
            
                        
        
        End If
        
    Next i
    
    Next
        
    first_ws.Activate
        
End Sub


