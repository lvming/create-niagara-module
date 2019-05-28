#################################################
# General options
#################################################

#################################################
# Input/Output options
#################################################

#################################################
# Keep options
#################################################

-keep class * extends javax.baja.sys.BObject {
  public protected *;
}
-keep interface * extends javax.baja.sys.BInterface {
  public *;
}

-keepclassmembers,allowoptimization enum * {
  public static **[] values();
  public static ** valueOf(java.lang.String);
}

#################################################
# Shrinking options
#################################################

#################################################
# Optimization options
#################################################

#################################################
# Obfuscation options
#################################################

-keepattributes !*Annotation*,!SourceDir

#################################################
# Preverification options
#################################################


