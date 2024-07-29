@ECHO OFF
::configure input variables
set checkout_folder_name="VEEx_console"
set checkout_URL="https://subversion.blueorigin.com/svn/operations-software/blue_test_stands/deliverables/released/VEEx_console"
set step2_batch_path=".\batch_files\VEEx_console_released_step2.bat"


:: init launchflag to indicate that this batch file was called
set launchflag=1

:: Checkout/Update deliverables folder
cd %~dp0
IF EXIST %checkout_folder_name% (
cd %checkout_folder_name%

:: Revert any local changes
svn revert -R .
IF ERRORLEVEL 1 GOTO Error_Update

:: Update and force it if needed. Don't save authentication info, might be a shared login machine
svn update --force --no-auth-cache
IF ERRORLEVEL 1 GOTO Error_Update

) ELSE (
svn checkout %checkout_URL% %checkout_folder_name%
IF ERRORLEVEL 1 GOTO Error_Checkout
)

:: Jump to step2 batch launch (nominally without errors)
GOTO CALL_step2_batch

:Error_Update
:: If we jumped here there is an error. Echo to user and pause to keep command window open
Echo.
Echo.
Echo There was an error performing SVN revert/update.  Verify that you don't have any files open from within the checkout folder.  You might have to SVN Cleanup the checkout folder prior to rerunning the batch file.  You can also try to delete the checkout folder and run the batch file for a fresh checkout.  If problem persists, then please contact DSCE.  Press any key to continue and launch the EXE without an SVN update
PAUSE
set launchflag=""
GOTO CALL_step2_batch

:Error_Checkout
:: If we jumped here there is an error svn updating. Echo to user and pause to keep command window open
Echo.
Echo.
Echo There was an error performing SVN checkout.  Please contact DSCE.  you will not be able to launch the EXE using this tool until this is fixed
PAUSE
GOTO QUIT

:CALL_step2_batch
cd %~dp0
cd %checkout_folder_name%
call %step2_batch_path%

:QUIT
:: Abort the batch script.  Take no more actions
