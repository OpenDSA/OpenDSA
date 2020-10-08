import sys

python3_3version = 0x030300A0
py33ErrMsg = '''\
You are trying to use an old python version.  
OpenDSA uses the venv module, introduced in python 3.3+
OpenDSA supports python 3.8 currently. '''

venvErrMsg = '''\
This is not an activated python virtual environment!!!

Platform    Shell             Activation Command
Linux       bash/zsh          source .pyVenv/bin/activate
            fish              source .pyVenv/bin/activate.fish
            csh/tcsh          source .pyVenv/bin/activate.csh
            PowerShell Core   .pyVenv/bin/Activate.ps1
Windows     cmd.exe           .pyVenv\\Scripts\\activate.bat
            PowerShell        .pyVenv\\Scripts\\Activate.ps1
            others            . .pyVenv\\Scripts\\activate

Deactivation command:     deactivate
To make a fresh pyVenv:   make clean-venv pull venv

Activate .pyVenv and then retry'''


if __name__ == '__main__':
	if sys.hexversion < python3_3version:
		print("Using python located at:", sys.prefix)
		print(py33ErrMsg)
		print(venvErrMsg)
		exit(1)
	if sys.base_prefix == sys.prefix:
		print("Using python located at:", sys.prefix)
		print(venvErrMsg)
		exit(1)
	print("pyVenv seems activated, all is well")
